import React , {useState} from "react";

function Form() {
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_id:'',
        quantity:'',
        product: 'Product A',
        product_cost:'',
        user_email:'',
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch('http://localhost:8000/api/orders/',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                alert('Order placed');
                setFormData({
                    customer_name:'',
                    customer_id:'',
                    quantity:'',
                    product:'product A',
                    product_cost:'',
                    user_email:'',
                });
            } else {
                alert('Error placin order');
            }
        } catch (error) {
            alert('Error submitting form');
        }
    };



  return (
    <form onSubmit={handleSubmit}>
      <input name="customer_name" value={formData.customer_name} onChange={handleChange} placeholder="Customer Name" required />
      <input name="customer_id" value={formData.customer_id} onChange={handleChange} placeholder="Customer ID" required />
      <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Quantity" required />
      <select name="product" value={formData.product} onChange={handleChange}>
        <option value="Product A">Product A</option>
        <option value="Product B">Product B</option>
      </select>
      <input name="product_cost" type="number" step="0.01" value={formData.product_cost} onChange={handleChange} placeholder="Product Cost" required />
      <input name="user_email" type="email" value={formData.user_email} onChange={handleChange} placeholder="User Email" required />
      <button type="submit">Place Order</button>
    </form>
  );


}

export default Form
