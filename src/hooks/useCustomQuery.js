import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export const useCustomQuery = () => {
  const navigate = useNavigate();
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  const getType = (check, init) => {
    if (!check) {
      return init;
    }
    return check;
  };

  // Product-Custom-hook
  // 술 종류에 따른 QueryString
  const type = urlSearchParams.get("type") || "";
  const sub = urlSearchParams.get("subtype") || "";

  const defaultQueryString = createSearchParams({
    type,
  }).toString();

  //   술에 따른 이동
  const MoveToType = TypeParam => {
    let queryStr = "";
    if (TypeParam) {
      const TypeString = getType(TypeParam.type, type);
      queryStr = createSearchParams({
        type: TypeString,
      }).toString();
    } else {
      queryStr = defaultQueryString;
    }
    navigate({ pathname: "../list", search: queryStr });
  };

  return { type, sub, MoveToType };
};
