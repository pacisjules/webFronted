import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import style from "../styles/dashboard/App.module.css";

import {
  BarGauge,
  Label,
  Tooltip,
  Export,
  Title,
  Font,
  Legend,
} from "devextreme-react/bar-gauge";

const values = [121.4, 135.4, 115.9];

const format = {
  type: "fixedPoint",
  precision: 1,
};

const Dashboard = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  function customizeTooltip(arg) {
    return {
      text: getText(arg, arg.valueText),
    };
  }

  function customizeText(arg) {
    return getText(arg.item, arg.text);
  }

  if (status === "authenticated") {
    return (
      <div>
        <Head>
          <title>Home Dashboard</title>
        </Head>

        <div className={style.container}>
          <div className={style.up}>
            <div className={style.left}>
              <br/>
              <h2>Today's Inventory</h2>
              <h3>Inventory Summary</h3>
              <br />

              <div className={style.cont_summary}>
                <div className={style.repo}>
                  <h2>200</h2>
                  <h3>Total Customers</h3>
                  <p>+ 2% from monday</p>
                </div>

                <div className={style.repo}>
                  <h2>200</h2>
                  <h3>Total Customers</h3>
                  <p>+ 2% from monday</p>
                </div>

                <div className={style.repo}>
                  <h2>200</h2>
                  <h3>Total Customers</h3>
                  <p>+ 2% from monday</p>
                </div>

                <div className={style.repo}>
                  <h2>200</h2>
                  <h3>Total Customers</h3>
                  <p>+ 2% from monday</p>
                </div>
              </div>
            </div>

            <div className={style.right}>
              
              <BarGauge
                id="gauge"
                startValue={0}
                endValue={200}
                defaultValues={values}
              >
                <Label visible={false} />
                <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
                <Export enabled={true} />
                <Title text="Top 3 Sales Products ">
                  <Font size={22} />
                </Title>
                <Legend
                  visible={true}
                  customizeText={customizeText}
                  verticalAlignment="bottom"
                  horizontalAlignment="center"
                />
              </BarGauge>
            </div>
          </div>
          <div className={style.down}>
            
          <div className={style.chart}>
            <h2>Total Revenue</h2>
          </div>

          <div className={style.chart}>
            <h2>Customer Satisfaction</h2>
          </div>

          <div className={style.chart}>
            <h2>Target vs Reality</h2>
          </div>

          </div>
        </div>
      </div>
    );
  }
};

function getText(item, text) {
  return `Product ${item.index + 1} - ${text} km/h`;
}

export default Dashboard;
