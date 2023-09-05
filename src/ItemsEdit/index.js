import {
  Container,
  Title,
  Space,
  Card,
  TextInput,
  Divider,
  NumberInput,
  Button,
  Group,
} from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import axios from "axios";

function MoviesEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/item/" + id)
      .then((response) => {
        setName(response.data.name);
        setPriority(response.data.priority);
        setUnit(response.data.unit);
        setQuantity(response.data.release_year);
      })
      .catch((error) => {
        notifications.show({
          title: error.response.data.message,
          color: "red",
        });
      });
  }, []);

  const handleUpdateItem = async (event) => {
    event.preventDefault();
    // const response = await axios.post("http://localhost:5000/movie");
    try {
      const response = await axios({
        method: "PUT",
        url: "http://localhost:5000/item/" + id,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
          name: name,
          quantity: quantity,
          unit: unit,
          priority: priority,
        }),
      });
      // show add success message
      notifications.show({
        title: "Item Edited",
        color: "green",
      });
      //redirect back to home page
      navigate("/");
    } catch (error) {
      console.log(error);
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    }
  };

  return (
    <Container>
      <Space h="50px" />
      <Title order={2} align="center">
        Edit item
      </Title>
      <Space h="50px" />
      <Card withBorder shadow="md" p="20px">
        <TextInput
          value={name}
          placeholder="Enter the item name here"
          label="Name"
          description="The name of the item"
          withAsterisk
          onChange={(event) => setName(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <NumberInput
          value={quantity}
          placeholder="Enter the item quantity here"
          label="Quantity"
          min={1}
          max={10}
          description="The quantity of the item"
          withAsterisk
          onChange={setQuantity}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={unit}
          placeholder="Enter the unit here"
          label="Unit"
          description="The unit of the item"
          withAsterisk
          onChange={(event) => setUnit(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={priority}
          placeholder="Enter the priority here"
          label="Priority"
          description="The priority of the item"
          withAsterisk
          onChange={(event) => setPriority(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        {/* <NumberInput
          value={rating}
          placeholder="Enter the rating here"
          label="Rating"
          min={1}
          max={10}
          description="The rating of the item"
          withAsterisk
          onChange={setRating}
        />
        <Space h="20px" /> */}
        <Button fullWidth onClick={handleUpdateItem}>
          Update
        </Button>
      </Card>
      <Space h="20px" />
      <Group position="center">
        <Button component={Link} to="/" variant="subtle" size="xs" color="gray">
          Go back to Home
        </Button>
      </Group>
      <Space h="100px" />
    </Container>
  );
}

export default MoviesEdit;
