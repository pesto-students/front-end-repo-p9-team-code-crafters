import {Button, Typography} from "antd";

const {Title, Text} = Typography;

export default function Home() {
  return (
    <main>
      <h1>Initial Page</h1>
      <Button type="primary"> Pink Button</Button>
      <Title level={2}>h2. Ant Design</Title>
      <Text>Ant Design (default)</Text>
    </main>
  );
}
