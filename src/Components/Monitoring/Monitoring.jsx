import React, { useEffect, useState } from "react";
import style from "./Monitoring.module.css";
import Button from "../../HelperComponents/Button/Button";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import Dropdown from "../../HelperComponents/DropDown/Dropdown";
import Table from "../../HelperComponents/Table/Table";
import data from "../../data/data.json";
import Modal from "../../HelperComponents/Modal/Modal";

const Monitoring = () => {
  const [selectedTab, setSelectedTab] = useState("pending");
  const [searchInput, setSearchInput] = useState("");
  const [triggerReason, setTriggerReason] = useState(undefined);
  const [risk, setRiskAction] = useState(undefined);
  const [initialData, setInitialData] = useState(data[selectedTab]);
  const [open, setOpen] = useState(false);
  const listTriggerReason = [
    "Hard Flag",
    "Temp Flag",
    "Restricted unflag",
    "Un Flag",
    "Reviwed",
  ];
  const listRiskLevel = ["Low", "Medium", "High"];

  useEffect(() => {
    if (searchInput !== "") {
      const filteredUserData = data[selectedTab].filter((user) =>
        user.userName.toLowerCase().includes(searchInput.toLowerCase())
      );
      setInitialData(filteredUserData);
    } else {
      setInitialData(data[selectedTab]);
    }
  }, [searchInput]);

  useEffect(() => {
    if (risk !== "Risk Level" && risk) {
      const filteredUserData = data[selectedTab].filter(
        (user) => (user.risk || "").toLowerCase() === (risk || "").toLowerCase()
      );
      setInitialData(filteredUserData);
    } else if (risk === "Risk Level") {
      setInitialData(data[selectedTab]);
    }
  }, [risk]);

  useEffect(() => {
    if (triggerReason !== "Trigger Reason" && triggerReason) {
      const filteredUserData = data[selectedTab].filter(
        (user) =>
          (user.triggerReason || "").toLowerCase() ===
          (triggerReason || "").toLowerCase()
      );
      setInitialData(filteredUserData);
    } else if (risk === "Trigger Reason") {
      setInitialData(data[selectedTab]);
    }
  }, [triggerReason]);

  useEffect(() => {
    setInitialData(data[selectedTab]);
    setSearchInput("");
    setTriggerReason(undefined);
    setRiskAction(undefined);
  }, [selectedTab]);

  return (
    <div className={style.container}>
      <Modal open={open} handleClose={() => setOpen(false)} />
      <h1>Monitoring</h1>
      <div className={style.progressBar}>
        <div className={style.tabs}>
          <div
            className={selectedTab === "pending" && style.selectedTab}
            onClick={() => setSelectedTab("pending")}
          >
            Pending
          </div>
          <div
            className={selectedTab === "completed" && style.selectedTab}
            onClick={() => setSelectedTab("completed")}
          >
            Completed
          </div>
        </div>
        <Button
          className={style.button}
          icon={<AiOutlineCloseCircle size={16} />}
          onClick={() => setOpen(true)}
        >
          Close Account
        </Button>
      </div>
      <div className={style.actions} style={{ marginBottom: "20px" }}>
        <div className={style.searchBox}>
          <FiSearch style={{ paddingLeft: 16, color: "#ADADAD" }} />
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <Dropdown
          className={style.select}
          optionsData={listTriggerReason}
          value={triggerReason}
          onClick={(e) => setTriggerReason(e.target.value)}
          placeholder={"Trigger Reason"}
        />
        <Dropdown
          optionsData={listRiskLevel}
          value={risk}
          className={style.select}
          onClick={(e) => setRiskAction(e.target.value)}
          placeholder={"Risk Level"}
        />
      </div>
      <Table initialData={initialData} />
    </div>
  );
};

export default Monitoring;
