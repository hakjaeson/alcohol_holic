import { useEffect } from "react";
import { Common } from "../../styles/CommonCss";
import {
  DropdownContent,
  DropdownItem,
  ItemBack,
} from "../../styles/basic/userDropCss";
import { getUser } from "../../api/mainApi";
import { useRecoilState } from "recoil";
import { userState } from "../../atom/userState";

export const LoggedInContent = () => {
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
    <>
      <DropdownContent>
        <div className="profile">
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <p style={{ marginRight: "5px" }}>반갑습니다</p>
            <p
              style={{
                marginRight: "3px",
                fontWeight: "600",
              }}
            >
              000
            </p>
            <p>{userData.address}님</p>
          </div>
          {/* <a className="profile-a">프로필 전환 &gt;</a> */}
          <p>현재 배송지</p>
          <p>대구광역시 중구 달성로123</p>
        </div>
        <div className="line"></div>
        <ItemBack>
          <DropdownItem href="/mypage">마이페이지</DropdownItem>
          <DropdownItem href="#about">주문/배송</DropdownItem>
          <DropdownItem href="#contact">리뷰작성</DropdownItem>
          <DropdownItem href="#logout">위시리스트</DropdownItem>
          <DropdownItem href="#logout">고객센터</DropdownItem>
          <DropdownItem href="#logout" style={{ color: Common.color.p300 }}>
            로그아웃
          </DropdownItem>
        </ItemBack>
      </DropdownContent>
    </>
  );
};

export const LoggedOutContent = () => {
  return (
    <>
      <DropdownContent>
        <div className="profile">
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <p style={{ marginRight: "5px" }}>반갑습니다</p>
            <p
              style={{
                marginRight: "3px",
                fontWeight: "600",
              }}
            >
              000
            </p>
            <p>님</p>
          </div>
          {/* <a className="profile-a">프로필 전환 &gt;</a> */}
          <p>현재 배송지</p>
          <p>대구광역시 중구 달성로123</p>
        </div>
      </DropdownContent>
    </>
  );
};
