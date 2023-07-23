import Table from "react-bootstrap/Table";

function DBTables({ dbDetails, dbResults }) {
  return (
    <Table className="mt-3 mb-4" size="sm" striped="columns" responsive>
      <thead>
        <tr>
          <th className="bg-primary tableTitleWidth">{dbDetails.title}</th>
          {dbDetails?.columns.map((column, index) => (
            <th key={index} className="bg-secondary">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dbResults?.rows?.map((row, key) => (
          <>
            <tr>
              <td>*</td>
              <td key={"th"}>{row?.transactionhash}</td>
              {dbDetails.title === "Contract Deployment" && (
                <td key={key}>{row?._address}</td>
              )}
              {dbDetails.title != "Contract Deployment" && (
                <td key={key + 1}>{row?.amount}</td>
              )}
              {dbDetails.title === "Mint Actions" && (
                <td key={key + 2}> {row?.recipientaddress}</td>
              )}
              <td key={key + 3}>{row?.explorerurl}</td>
            </tr>
          </>
        ))}
      </tbody>
    </Table>
  );
}

export default DBTables;
