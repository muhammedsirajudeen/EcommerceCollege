export default (req, res) => {
    const razorpay_id = process.env.RAZORPAY_ID;
    res.status(200).json({ env: razorpay_id });
  };