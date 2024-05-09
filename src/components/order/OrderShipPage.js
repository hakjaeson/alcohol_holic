import { ConfigProvider } from "antd";
import React, { useEffect, useState } from "react";
import { getDelivery } from "../../api/orderApi";
import { OrderSTableData } from "../../mock/OrderTableData";
import { Common } from "../../styles/CommonCss";
import { TableCustom } from "../../styles/common/tableCss";

const initState = [
  {
    alcoholname: "",
    marketname: "",
    amount: 0,
    price: 0,
    delivery: "",
    division: "",
    address: "",
    purchaseday: "",
    picture: "",
  },
];
const OrderShipPage = () => {
  const [orderData, setOrderData] = useState(initState);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    getDelivery({
      successFn: data => {
        setOrderData(data);
      },
      failFn: data => {
        alert("픽업목록 불러오기 실패");
      },
      errorFn: data => {
        alert("서버상태 불안정 다음에 시도");
      },
    });
  }, []);
  const columns = [
    {
      title: "이미지",
      dataIndex: "picture",
      render: (text, record) => (
        <img style={{ width: "80px" }} src={record.picture} alt="리뷰 작성" />
      ),
    },
    {
      title: "제품명",
      dataIndex: "alcoholname",
    },
    {
      title: "주문일자",
      dataIndex: "purchaseday",
    },
    {
      title: "매장명",
      dataIndex: "marketname",
    },
    {
      title: "주문방식",
      dataIndex: "delivery",
    },
    {
      title: "주소",
      dataIndex: "address",
    },
    {
      title: "수량",
      dataIndex: "amount",
    },
    {
      title: "결제금액",
      dataIndex: "price",
    },
  ];
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: Common.color.p900,
          },
          components: {
            Table: {
              headerBg: "none",
              headerColor: Common.color.p500,
            },
          },
        }}
      >
        <TableCustom
          // rowSelection={rowSelection}
          columns={columns}
          dataSource={orderData}
          pagination={false}
        />
      </ConfigProvider>
    </div>
  );
};

export default OrderShipPage;
