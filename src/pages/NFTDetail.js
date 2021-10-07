import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import Category from "../assets/Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faCheck } from "@fortawesome/free-solid-svg-icons";
import GetUserPK from "../assets/GetUserPK";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const NFTDetail = (props, { history }) => {
  const userPK = GetUserPK();
  const [NFTDetail, setNFTDetail] = useState("");
  const [loading, setLoading] = useState(true);
  const { NFTId } = useParams();
  const token = window.localStorage.getItem("token");
  console.log(token);
  useEffect(() => {
    var t = window.localStorage.getItem("token");
    if (t === "") {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(`api/v1/nft/detail/${NFTId}`, { token: token });
      console.log(result);
      setNFTDetail(result.data.success);
      setLoading(false);
    };
    fetchData();
  }, []);

  const wrapper = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const cardStyle = {
    width: "70%",
  };

  return (
    <div style={wrapper}>
      <div style={cardStyle}>
        <div className="card mb-3">
          <h3 className="card-header">{NFTDetail.title}</h3>
          <div className="card-body">
            <span className="badge bg-dark">{NFTDetail.category === "0" ? "Art" : "Photo"}</span>
          </div>
          {/*<svg xmlns="http://www.w3.org/2000/svg" className="d-block user-select-none" width="100%" height="200"*/}
          {/*     aria-label="Placeholder: Image cap" focusable="false" role="img" preserveAspectRatio="xMidYMid slice"*/}
          {/*     viewBox="0 0 318 180" style="font-size:1.125rem;text-anchor:middle">*/}
          {/*    <rect width="100%" height="100%" fill="#868e96"></rect>*/}
          {/*    */}
          {/*</svg>*/}
          <img src={NFTDetail.imageUrl} className="m-2" />
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>상품 설명</b>
            </li>
            <li className="list-group-item">{NFTDetail.explanation}</li>
          </ul>
          <div className="card-body">
            <Link to={`/creatingorder/${NFTDetail.id}`} className="text-decoration-none">
              <button type="button" className="btn btn-primary">
                판매등록하기
              </button>
            </Link>
          </div>
          <div className="card-footer text-muted">{NFTDetail.transactionHash}</div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetail;
