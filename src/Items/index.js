import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Title, Grid, Card, Badge, Group, Space, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const fetchItems = async (priority, purchased) => {
  //   if (priority !== "") {
  //     const response = await axios.get(
  //       "http://localhost:5000/item?priority=" + priority
  //     );
  //     return response.data;
  //   } else if (purchased !== "") {
  //     const response = await axios.get(
  //       "http://localhost:5000/item?purchased=" + purchased
  //     );
  //     return response.data;
  //   } else {
  //     const response = await axios.get("http://localhost:5000/item");
  //     return response.data;
  //   }
  // };

  const response = await axios.get(
    "http://localhost:5000/item?" +
      (priority !== "" ? "priority=" + priority : "") +
      (purchased !== "" ? "&purchased=" + purchased : "")
  );
  return response.data;
};

const updateItem = async (item_id = "") => {
  await axios({
    method: "PUT",
    url: "http://localhost:5000/item/" + item_id + "/purchased",
  });
};

const deleteItem = async (item_id = "") => {
  await axios({
    method: "DELETE",
    url: "http://localhost:5000/item/" + item_id,
  });
};

function Items() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const [items, setItems] = useState("");
  const [purchased, setPurchased] = useState("");
  const [priority, setPriority] = useState("");
  const {
    isLoading,
    isError,
    data: items,
    error,
  } = useQuery({
    queryKey: ["items", priority, purchased],
    queryFn: () => fetchItems(priority, purchased),
  });

  console.log(items);

  const memoryItems = queryClient.getQueryData(["items", "", ""]);
  const priorityOptions = useMemo(() => {
    let options = [];
    if (items && items.length > 0) {
      items.forEach((item) => {
        if (!options.includes(item.priority)) {
          options.push(item.priority);
        }
      });
    }
    // console.log(options);
    return options;
  }, [memoryItems]);

  // const purchasedOptions = useMemo(() => {
  //   let options = [];
  //   if (items && items.length > 0) {
  //     items.forEach((item) => {
  //       if (!options.includes(item.purchased)) {
  //         options.push(item.purchased);
  //       }
  //     });
  //   }
  //   return options;
  // }, [memoryItems]);

  const updateMutation = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      //triggered when API successfully executed
      queryClient.invalidateQueries({
        //ask React query to retrigger the API
        queryKey: ["items", priority, purchased],
      });

      notifications.show({
        title: "Updated Purchase",
        color: "green",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      //triggered when API successfully executed
      queryClient.invalidateQueries({
        //ask React query to retrigger the API
        queryKey: ["items", priority, purchased],
      });

      notifications.show({
        title: "Item deleted",
        color: "green",
      });
    },
  });

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/item")
  //     .then((response) => {
  //       setItems(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // const filterItem1 = async (priority = "") => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/item?priority=" + priority
  //     );
  //     setItems(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const filterItem2 = async (purchased = "") => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/item?purchased=" + purchased
  //     );
  //     setItems(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleItemDelete = async (item_id) => {
  //   try {
  //     await axios({
  //       method: "DELETE",
  //       url: "http://localhost:5000/item/" + item_id,
  //     });
  //     notifications.show({
  //       title: "Item Deleted",
  //       color: "green",
  //     });
  //     const newitems = items.filter((i) => i._id !== item_id);
  //     setItems(newitems);
  //   } catch (error) {
  //     notifications.show({
  //       title: error.response.data.message,
  //       color: "red",
  //     });
  //   }
  // };

  // const PurchasedUpdate = async (item_id) => {
  //   try {
  //     await axios.put(`http://localhost:5000/item/${item_id}`, {
  //       purchased: true,
  //     });

  //     notifications.show({
  //       title: "Purchsed Updated",
  //       color: "green",
  //     });

  //     const updatedItems = items.filter((i) => i._id !== item_id);
  //     setItems(updatedItems);
  //   } catch (error) {
  //     notifications.show({
  //       title: error.response.data.message,
  //       color: "red",
  //     });
  //   }
  // };

  return (
    <>
      <Group position="apart">
        <Title order={3} align="center">
          Personal Shopping List
        </Title>
        <Button component={Link} to="/items_add" color="blue">
          Add New Items
        </Button>
      </Group>
      <Space h="20px" />
      <Group>
        <select
          value={priority}
          onChange={(event) => {
            setPriority(event.target.value);
          }}
        >
          <option value="">All priority</option>
          {priorityOptions.map((priority) => {
            console.log(priorityOptions);
            return (
              <option key={priority} value={priority}>
                {priority}
              </option>
            );
          })}
        </select>

        <select
          value={purchased}
          onChange={(event) => {
            setPurchased(event.target.value);
          }}
        >
          <option value="">All purchased</option>
          <option value="yes">Purchased</option>
          <option value="no">Unpurchased</option>
        </select>
        {/* <Button
          onClick={() => {
            filterItem1("");
          }}
        >
          All
        </Button>
        <Button
          onClick={() => {
            filterItem1("Low");
          }}
        >
          Low
        </Button>
        <Button
          onClick={() => {
            filterItem1("Medium");
          }}
        >
          Medium
        </Button>
        <Button
          onClick={() => {
            filterItem1("High");
          }}
        >
          High
        </Button> */}
        {/* <Button
          onClick={() => {
            filterItem2("no");
          }}
        >
          Unpurchased
        </Button>
        <Button
          onClick={() => {
            filterItem2("yes");
          }}
        >
          Purchased
        </Button> */}
      </Group>
      <Space h="20px" />
      <Grid>
        {items
          ? items.map((item) => {
              return (
                <Grid.Col span={4} key={item._id}>
                  <Card withBorder shadow="sm" p="20px">
                    <Title order={5}>{item.name}</Title>
                    <Space h="20px" />
                    <Group position="center" spacing="5px">
                      <Badge color="yellow">{item.quantity}</Badge>
                      <Badge color="green">{item.unit}</Badge>
                      <Badge color="grape">{item.priority}</Badge>
                    </Group>
                    <Space h="20px" />
                    <Group position="apart">
                      <Button
                        component={Link}
                        to={"/items/" + item._id}
                        variant="gradient"
                        gradient={{ from: "purple", to: "pink" }}
                        size="xs"
                        radius="50px"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="gradient"
                        gradient={{ from: "purple", to: "pink" }}
                        size="xs"
                        radius="50px"
                        onClick={() => {
                          updateMutation.mutate(item._id);
                        }}
                      >
                        {item.purchased ? "Purchased" : "Mark as Purchased"}
                      </Button>
                      <Button
                        variant="gradient"
                        gradient={{ from: "purple", to: "pink" }}
                        size="xs"
                        radius="50px"
                        onClick={() => {
                          deleteMutation.mutate(item._id);
                        }}
                      >
                        Delete
                      </Button>
                    </Group>
                  </Card>
                </Grid.Col>
              );
            })
          : null}
      </Grid>
    </>
  );
}

export default Items;
