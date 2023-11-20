/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import style from "./Table.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Table = ({ initialData = [] }) => {
  const [tableData, setTableData] = useState(initialData);
  const [riskSort, setRiskSort] = useState(0);
  const [queueSort, setQueueSort] = useState(0);
  const [dateAddedSort, setDateAddedSort] = useState(0);

  const handleRiskSort = () => {
    if (riskSort === 0) setRiskSort(1);
    else if (riskSort === 2) setRiskSort(0);
    else setRiskSort(2);
  };

  const handleQueueSort = () => {
    if (queueSort === 0) setQueueSort(1);
    else if (queueSort === 2) setQueueSort(0);
    else setQueueSort(2);
  };

  const handleDateAddedSort = () => {
    if (dateAddedSort === 0) setDateAddedSort(1);
    else if (dateAddedSort === 2) setDateAddedSort(0);
    else setDateAddedSort(2);
  };

  useEffect(() => {
    setTableData(initialData);
  }, [initialData])

  useEffect(() => {
    if (riskSort === 1) {
      setTableData(
        tableData.slice().sort((a, b) => {
          const riskOrder = { low: 1, medium: 2, high: 3 };
          return riskOrder[a.risk] - riskOrder[b.risk];
        })
      );
    } else if (riskSort === 2) {
      setTableData(
        tableData.slice().sort((a, b) => {
          const riskOrder = { low: 1, medium: 2, high: 3 };
          return riskOrder[b.risk] - riskOrder[a.risk];
        })
      );
    } else setTableData(initialData);
  }, [riskSort]);

  useEffect(() => {
    let sortedUserData = initialData;
    if (queueSort === 1)
      sortedUserData = tableData.slice().sort((a, b) => a.inQueue - b.inQueue);
    else if (queueSort === 2)
      sortedUserData = tableData.slice().sort((a, b) => b.inQueue - a.inQueue);
    setTableData(sortedUserData);
  }, [queueSort]);

  useEffect(() => {
    let sortedUserData = initialData;
    if (dateAddedSort === 1)
      sortedUserData = tableData.slice().sort((a, b) => {
        const dateA = new Date(a.dateAdded);
        const dateB = new Date(b.dateAdded);
        return dateA - dateB;
      });
    else if (dateAddedSort === 2)
      sortedUserData = tableData.slice().sort((a, b) => {
        const dateA = new Date(a.dateAdded);
        const dateB = new Date(b.dateAdded);
        return dateB - dateA;
      });
    setDateAddedSort(sortedUserData);
  }, []);

  return (
    <table className={style.table}>
      <tr>
        <th>User</th>
        <th onClick={handleRiskSort}>
          <div
            className={style.flexRow}
            style={{ justifyContent: "start", cursor: "pointer" }}
          >
            Risk Level
            <div className={style.sort}>
              <IoIosArrowUp
                style={{
                  transform: "translateY(3px)",
                  color: riskSort === 1 ? "#050505" : "#777676",
                }}
                size={14}
              />
              <IoIosArrowDown
                size={14}
                style={{
                  transform: "translateY(-3px)",
                  color: riskSort === 2 ? "#050505" : "#777676",
                }}
              />
            </div>
          </div>
        </th>
        <th>Trigger Reason</th>
        <th onClick={handleQueueSort}>
          <div
            className={style.flexRow}
            style={{ justifyContent: "start", cursor: "pointer" }}
          >
            In Queue For
            <div className={style.sort}>
              <IoIosArrowUp
                style={{
                  transform: "translateY(3px)",
                  color: queueSort === 1 ? "#050505" : "#777676",
                }}
                size={14}
              />
              <IoIosArrowDown
                size={14}
                style={{
                  transform: "translateY(-3px)",
                  color: queueSort === 2 ? "#050505" : "#777676",
                }}
              />
            </div>
          </div>
        </th>
        <th onClick={handleDateAddedSort}>
          <div
            className={style.flexRow}
            style={{ justifyContent: "start", cursor: "pointer" }}
          >
            Date Added on
            <div className={style.sort}>
              <IoIosArrowUp
                style={{
                  transform: "translateY(3px)",
                  color: dateAddedSort === 1 ? "#050505" : "#777676",
                }}
                size={14}
              />
              <IoIosArrowDown
                size={14}
                style={{
                  transform: "translateY(-3px)",
                  color: dateAddedSort === 2 ? "#050505" : "#777676",
                }}
              />
            </div>
          </div>
        </th>
        <th>Previously Reviewed</th>
      </tr>
      {tableData.map((userData, idx) => {
        return (
          <tr>
            <td className={style.flexRow}>
              <div className={style.tableCellColumn}>
                <h2>{userData.userName}</h2>
                <p>{userData.email}</p>
              </div>
              <a href={`mailto:${userData.email}`}>
                <FiExternalLink size={18} color="#4643EE" />
              </a>
            </td>
            <td
              className={style.riskTD}
              style={{
                color:
                  userData.risk === "medium"
                    ? "#88670F"
                    : userData.risk === "high"
                      ? "#7D2424"
                      : "#006540",
              }}
            >
              <div
                className={style.flexRow}
                style={{ justifyContent: "start" }}
              >
                <div
                  className={style.circle}
                  style={{
                    background:
                      userData.risk === "medium"
                        ? "#88670F"
                        : userData.risk === "high"
                          ? "#7D2424"
                          : "#006540",
                  }}
                ></div>
                {userData.risk}
              </div>
            </td>
            <td>{userData.triggerReason}</td>
            <td>{userData.inQueue} days</td>
            <td className={style.dateStyle}>{userData.dateAdded}</td>
            <td>
              <div className={style.tableCellColumn}>
                <h2>{userData.previousyReviewed}</h2>
                <p>{userData.reviewDate}</p>
              </div>
            </td>
          </tr>
        );
      })}
    </table>
  );
};

export default Table;
