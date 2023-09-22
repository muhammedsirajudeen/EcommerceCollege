export default function Handler(req,res){
    const Razorpay = require('razorpay');
    if(req.method==='POST'){
        console.log(req.body)

        try{
            var instance = new Razorpay({ key_id: process.env.RAZORPAY_ID, key_secret: process.env.RAZORPAY_SECRET })
            var options = {
                amount: req.body.amount,  // amount in the smallest currency unit
                currency: "INR",
                receipt: "order_rcptid_11"
              };
              instance.orders.create(options, function(err, order) {
    
                res.status(200).json({data:order})
                if(err){
                    console.log(err)
                }
    
            });

        }catch(error){
            res.status(501)
        }


   
   
    }
    // res.status(200).json({data:"hello world"})
}