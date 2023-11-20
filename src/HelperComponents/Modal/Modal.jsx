import React, { useEffect, useState } from "react";
import style from "./Modal.module.css";
import { MdOutlineClose } from "react-icons/md";
import Button from "../Button/Button";

const Modal = ({ open, handleClose }) => {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [wantUAR, setWantUAR] = useState(null);
  const [chargeFee, setChargeFee] = useState(false);

  useEffect(() => {
    setEmail("");
    setReason("");
    setNote("");
    setWantUAR(null);
    setChargeFee(false);
  }, [open])

  return (
    open && (
      <>
        <div className={style.backDrop} onClick={handleClose}></div>
        <div className={style.container}>
          <div className={style.header}>
            <h1>Close Account</h1>
            <MdOutlineClose
              size={24}
              style={{ cursor: "pointer" }}
              onClick={handleClose}
            />
          </div>
          <div className={style.flexColumn}>
            <p>Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={style.flexRow}>
            Want to file UAR
            <div
              className={style.circle}
              style={{
                marginLeft: "36px",
                border: wantUAR && "1px solid #4643EE",
              }}
              onClick={() => setWantUAR(true)}
            >
              {wantUAR && (
                <div
                  className=""
                  style={{
                    width: "80%",
                    height: "80%",
                    borderRadius: "50%",
                    background: "#4643EE",
                  }}
                ></div>
              )}
            </div>
            Yes
            <div
              className={style.circle}
              style={{
                marginLeft: "20px",
                border: !wantUAR && "1px solid #4643EE",
              }}
              onClick={() => setWantUAR(false)}
            >
              {!wantUAR && (
                <div
                  className=""
                  style={{
                    width: "80%",
                    height: "80%",
                    borderRadius: "50%",
                    background: "#4643EE",
                  }}
                ></div>
              )}
            </div>
            No
          </div>
          <div className={style.flexColumn}>
            <p>Reason</p>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div className={style.flexColumn}>
            <p>Note</p>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <div className={style.flexRow}>
            <div className={style.flexRow}>
              <div
                className={style.circle}
                style={{
                  border: chargeFee && "1px solid #4643EE",
                }}
                onClick={() => setChargeFee(!chargeFee)}
              >
                {chargeFee && (
                  <div
                    className=""
                    style={{
                      width: "80%",
                      height: "80%",
                      borderRadius: "50%",
                      background: "#4643EE",
                    }}
                  ></div>
                )}
              </div>
              Charge closure fee
            </div>
            <Button
              disabled={!(email !== "" && reason !== "" && note !== "")}
              buttonType={"primary"}
              onClick={handleClose}
            >
              Close Account
            </Button>
          </div>
        </div>
      </>
    )
  );
};

export default Modal;
