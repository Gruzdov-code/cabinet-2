import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TabContent from "./TabContent";
import TabBar from "./TabBar";

const getActiveTabDefault = (children, defaultTabs) => {
  if (!Array.isArray(children)) return;

  if (defaultTabs) return defaultTabs;

  return children[0].props.tabId || "default";
};

const TabLayout = ({ children, title, hideTabsBar }) => {
  const { tabId: defaultTabs } = useParams();
  const [activeTab, setActiveTab] = useState(
    getActiveTabDefault(children, defaultTabs)
  );


  useEffect(() => {
    setActiveTab(getActiveTabDefault(children, defaultTabs));
  }, [children, defaultTabs]);


  return (
    <>
      <TabBar title={title} activeTab={activeTab} handleTab={setActiveTab} hideTabsBar={hideTabsBar}>
        {children}
      </TabBar>
      <div className="app__inner">
        <TabContent activeTab={activeTab}>
          {children}
        </TabContent>
      </div>
    </>
  );
};

export default TabLayout;
