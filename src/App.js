import React, { useEffect, useState } from "react";

function App() {

  const [data, setData] = useState({name:"zenek",age:"20"})

  useEffect(() =>
	{
		(async () =>
		{
			const response = await fetch("http://localhost:5000/api/data")
			const responseJson = await response.json()
      setData(responseJson)

		})();
	}, []);

  return (
    <div>
      <h1>
        {data.name}
      </h1>
      <h1>
        {data.age}
      </h1>
    </div>
  );
}

export default App;
