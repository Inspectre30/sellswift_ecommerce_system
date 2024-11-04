

const AdminPanel = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Seller' },
    { id: 3, name: 'Tristan Thompson', email: 'tristan@example.com', role: 'Customer' },
    { id: 4, name: 'Linda Smith', email: 'linda@example.com', role: 'Customer' },
    { id: 5, name: 'Eric Gordon', email: 'eric@example.com', role: 'Customer' },
    { id: 6, name: 'Paul Mcarthy', email: 'paul@example.com', role: 'Seller' },
    { id: 7, name: 'Christie Evans', email: 'christie@example.com', role: 'Seller' },
    { id: 8, name: 'Rhea Cruz', email: 'rhea@example.com', role: 'Customer' },
    { id: 9, name: 'Sam Lee', email: 'sam@example.com', role: 'Seller' },
  ];

  return (
    <div className="container mx-auto text-center">
      <h1 className="text-2xl font-bold mb-6">List of Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email Address</th>
              <th className="px-4 py-2 border-b">Role</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="px-4 py-2 border-b">{user.name}</td>
                <td className="px-4 py-2 border-b">{user.email}</td>
                <td className="px-4 py-2 border-b">{user.role}</td>
                <td className="px-4 py-2 border-b">
                  <button className="bg-red-500 text-white px-4 py-2 hover:bg-red-600">
                    Ban
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;

//now implement the fetching of users from database using axios
//and also try to ask this type of filtering to chatgpt: 
// const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       let orderItems = []
//       for(const items in cartItems) {
//         for(const item in cartItems[items]) {
//           if(cartItems[items][item] > 0) {
//               const itemInfo = structuredClone(products.find(product => product._id === items))
//               if(itemInfo) {
//                 itemInfo.size = item
//                 itemInfo.quantity = cartItems[items][item]
//                 orderItems.push(itemInfo)
//               }
//           }
//         }
//       }
//      let orderData = {
//       address: formData,
//       items:orderItems,
//       amount:getCartAmount()+delivery_fee,
//      }
//      switch(method) {
//       //API CALLS FOR COD
//       case 'cod':
//         const response = await axios.post(backendUrl+ '/api/order/place',orderData,{headers:{token}});
//         if(response.data.success) {
//           setCartItems({})
//           navigate('/orders')
//         }else{
//           toast.error(response.data.msg)
//         }
//         break;

//       default:
//         break;
//      }
//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
      
//     }
//   }