import { useState } from "react";
import shortid from "shortid"
import Tab from "../components/Tab";

const Tabs = props => {
  let { children } = props;

  // Declare a new state variable, which we'll call "count"
  const [activeTab, setActiveTab] = useState(props.children[0].props.label);

  let onClickTabItem = tab => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <ol className="tab-list">
        {children.map(child => {
          const key = shortid.generate()
          const { label } = child.props;
          return (
            <Tab
              activeTab={activeTab}
              key={key}
              label={label}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>
      <div className="tab-content">
        {children.map(child => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
      <style jsx>
        {`
          .tabs {
            grid-row: 3/4;
            grid-column: 3/4;
          }
          .tab-list {
            border-bottom: 1px solid #ccc;
            padding-left: 0;
            margin-top: 0;
            position: sticky;
            top: 0px;
            background: #1f202c;
            padding-top: 10px;
            z-index: 2;
          }
        `}
      </style>
    </div>
  );
};

export default Tabs;
