import { Container, Title, Space, Divider } from "@mantine/core";

import Items from "../Items";

function Home() {
  return (
    <Container>
      <Space h="50px" />
      <Title align="center" color="blue">
        Shopping List
      </Title>
      <Space h="30px" />
      <Divider />
      <Space h="30px" />
      {/* list all the movies here */}
      <Items />
      <Space h="30px" />
    </Container>
  );
}

export default Home;
