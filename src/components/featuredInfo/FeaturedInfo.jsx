import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("/orders/income");
        const data = [...res.data].sort((a, b) => a._id - b._id);
        setIncome([...data]);
        setPercentage((data[1]?.total * 100) / data[0]?.total - 100);
      } catch (err) {
        console.log(err.message);
      }
    };
    getIncome();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{income[1]?.total}</span>
          <span className="featuredMoneyRate">
            {Math.floor(percentage)}
            {"%"}
            {percentage < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon positive" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
