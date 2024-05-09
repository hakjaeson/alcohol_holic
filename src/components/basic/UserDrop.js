import styled from "@emotion/styled/macro";
import React, { useEffect, useState } from "react";
import { Common } from "../../styles/CommonCss";
import { Flex } from "antd";
import {
  DropdownContent,
  DropdownItem,
  DropdownWrapper,
  ItemBack,
} from "../../styles/basic/userDropCss";
import useCustomLogin from "../../hooks/useCustomLogin";
import { LoggedInContent, LoggedOutContent } from "./UserDropContent";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { activeSideState } from "../../atom/activeSideState";
import { userState } from "../../atom/userState";
import { getUser } from "../../api/mainApi";

const UserDrop = () => {
  const [open, setOpen] = useState(false);
  const [activeSide, setActiveSide] = useRecoilState(activeSideState);
  const { isLogin, doLogout } = useCustomLogin();
  const navigate = useNavigate();

  const handleActive = sideId => {
    setActiveSide(sideId);
    navigate(`/mypage/${sideId}`);
  };

  const [userData, setUserData] = useRecoilState(userState);

  useEffect(() => {
    getUser({
      successFn: data => {
        setUserData(data); // 성공 시 데이터 설정
      },
      failFn: data => {
        alert("most 실패");
      },
      errorFn: data => {
        alert("서버상태 불안정 다음에 most 시도");
      },
    });
  }, []);
  console.log("유저데이터", userData);
  return (
    <DropdownWrapper
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a href="/mypage">
        <img src={process.env.PUBLIC_URL + "/images/user.png"} />
      </a>

      <DropdownContent isOpen={open}>
        {isLogin ? (
          <>
            <div className="profile">
              <div style={{ display: "flex", marginBottom: "10px" }}>
                <p style={{ marginRight: "5px" }}>반갑습니다</p>
                <p
                  style={{
                    marginRight: "3px",
                    fontWeight: "600",
                  }}
                >
                  {userData[0].nickname}
                </p>
                <p>님</p>
              </div>

              <p>현재 배송지</p>
              <p style={{ fontWeight: "bold" }}>{userData[0].address}</p>
              <p style={{ fontWeight: "bold" }}>{userData[0].address2}</p>
            </div>
            <div className="line"></div>
            <ItemBack>
              <DropdownItem onClick={() => handleActive("info")}>
                마이페이지
              </DropdownItem>
              <DropdownItem onClick={() => handleActive("order")}>
                주문/배송
              </DropdownItem>
              <DropdownItem onClick={() => handleActive("review")}>
                리뷰작성
              </DropdownItem>
              <DropdownItem onClick={() => handleActive("wish")}>
                위시리스트
              </DropdownItem>
              {/* <DropdownItem href="#logout">고객센터</DropdownItem> */}
              <DropdownItem
                onClick={doLogout}
                style={{ color: Common.color.p300 }}
              >
                로그아웃
              </DropdownItem>
            </ItemBack>
          </>
        ) : (
          <>
            <div className="profile">
              <div style={{ display: "flex", justifyContent: "center" }}>
                {/* <p style={{ marginRight: "5px" }}>
                  로그인이 필요한 서비스 입니다.
                </p> */}
                <p style={{ fontWeight: "bold" }}>
                  로그인이 필요한 서비스 입니다.
                </p>
                <p
                  style={{
                    marginRight: "3px",
                    fontWeight: "600",
                  }}
                ></p>
              </div>
            </div>
          </>
        )}
      </DropdownContent>
    </DropdownWrapper>
  );
};

export default UserDrop;
