import { List, Checkbox } from "antd";
export default function MyList({ title, data }) {
  return (
    <>
      <p style={{ textAlign: "center" }}>{title}</p>
      <div
        id="scrollableDiv"
        style={{
          height: 250,
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.eventId}>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.title}</a>}
              />
              <div>
                <Checkbox />
              </div>
            </List.Item>
          )}
        />
      </div>
    </>
  );
}
