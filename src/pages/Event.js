import { Outlet, Link, useNavigate } from "react-router-dom";

const Event = () => {
	const navigate = useNavigate();

	return (
		<>
            <div>오늘의 이벤트</div>
			<div onClick={()=>{navigate("./one")}}>이동1</div>
			<div onClick={()=>{navigate("./two")}}>이동2</div>
            <Outlet></Outlet>
		</>
	);
};

export default Event;