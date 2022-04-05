import { Tabs, Button, ConfigProvider, Typography } from "antd";
import React from "react";
import ModiriyatKala from "./ModiriyatKala";
import ModiriyatSefaresh from "./ModiriyatSefaresh";
import ModiriyatMojodi from "./ModiriyatMojodi";
const { TabPane } = Tabs;

const OperationsSlot = {
	left: (
		<Typography.Title style={{ padding: "0.5em 0" }}>
			پنل مدیریت فروشگاه
		</Typography.Title>
	),
	right: <Button>بازگشت به سایت</Button>,
};

const AdminHeader = () => {
	const [position, setPosition] = React.useState(["left", "right"]);

	const slot = React.useMemo(() => {
		if (position.length === 0) return null;

		return position.reduce(
			(acc, direction) => ({
				...acc,
				[direction]: OperationsSlot[direction],
			}),
			{}
		);
	}, [position]);

	return (
		<ConfigProvider direction="rtl">
			<Tabs
				tabBarExtraContent={slot}
				tabBarGutter={50}
				centered
				style={{ padding: "1em" }}
			>
				<TabPane tab="کالاها" key="1">
					<ModiriyatKala />
				</TabPane>
				<TabPane tab="موجودی و قیمت ها" key="2">
                <ModiriyatMojodi />
				</TabPane>
				<TabPane tab="سفارش ها" key="3">
					<ModiriyatSefaresh />
				</TabPane>
			</Tabs>
		</ConfigProvider>
	);
};

export default AdminHeader;