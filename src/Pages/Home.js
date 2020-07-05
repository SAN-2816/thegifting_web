import React from "react";
import axios from "axios";
import Delivery from "../Components/Delivery";
import Info from "../Components/Info";
import "../CSS/Home.css";

class Home extends React.Component {
  //t_code: 택배사코드, t_invoice: 운송장 번호
  //대한통운: 04, 한진택배: 05, 경동택배: 23
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isResult: false,
      info: {},
      date: [],
      t_code: "null",
      t_invoice: "",
    };
    this.getDelivery = this.getDelivery.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    if (this.state.t_code === "null" || this.state.t_invoice === "") {
      alert("입력값을 확인해주세요.");
    } else {
      this.getDelivery();
    }
    event.preventDefault();
  }
  getDelivery = async () => {
    const url =
      "http://localhost:5000/delivery/find?t_code=" +
      this.state.t_code +
      "&t_invoice=" +
      this.state.t_invoice;
    const {
      data: { message },
    } = await axios.get(url).catch(function (error) {
      console.log(error);
    });
    const json = JSON.parse(message);
    console.log(json);
    if (json.status === false) {
      alert(json.msg);
    } else if (json.complete === false) {
      alert("올바르지 않은 운송장 번호입니다.");
    } else {
      this.setState({
        info: json,
        data: json.trackingDetails,
        isResult: true,
      });
    }
  };
  render() {
    const { isResult, info, data } = this.state;
    return (
      <div className="home">
        <h1>택배조회시스템</h1>
        <form className="home-form" onSubmit={this.handleSubmit}>
          <select name="t_code" onChange={this.handleChange}>
            <option defaultValue value="null">
              택배사 정보
            </option>
            <option value="04">CJ대한통운</option>
            <option value="05">한진택배</option>
            <option value="23">경동택배</option>
          </select>
          <input
            type="text"
            name="t_invoice"
            value={this.state.code}
            onChange={this.handleChange}
          />
          <input type="submit" value="확 인" />
        </form>
        {isResult ? (
          <div className="home-delivery">
            <Info
              invoiceNo={info.invoiceNo}
              receiverName={info.receiverName}
              receiverAddr={info.receiverAddr}
              itemName={info.itemName}
            />
            {data.map((data, index) => (
              <Delivery
                key={data.time}
                index={index}
                timeString={data.timeString}
                kind={data.kind}
                manName={data.manName}
                where={data.where}
              />
            ))}
          </div>
        ) : (
          <div>검색해주세요.</div>
        )}
      </div>
    );
  }
}
export default Home;
