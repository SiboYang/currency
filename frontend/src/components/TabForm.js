import { Tabs } from "antd";
import SubForm from "./SubForm";
import UnSubForm from "./UnSubForm";

const { TabPane } = Tabs;

const TabForm = () => {
  return (
    <div>
      <Tabs defaultActiveKey="1" centered animated>
        <TabPane tab="Subscribe" key="1">
          <SubForm></SubForm>
        </TabPane>
        <TabPane tab="Unsubscribe😞" key="2">
          <UnSubForm></UnSubForm>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TabForm;
