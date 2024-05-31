

function cartDetail(listCart) {
    const cartItems = JSON.parse(listCart);
    return (
        <>
        <table>
        <thead>
        <tr>
          <th>Type</th>
          <th>ID</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {cartItems && cartItems.map((item, index) => (
          <tr key={index}>
            <td>{item.type}</td>
            <td>{item.id}</td>
            <td>{item.quantity}</td>
          </tr>
        ))}
      </tbody>
        </table>
        </>
    );
}

export default cartDetail;