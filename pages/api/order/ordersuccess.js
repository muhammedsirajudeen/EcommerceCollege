export default function Handler(req,res){
    //send the email from there with the username save the cart to successful orders and then empty the cart too
    //cancellation of order will be just with deleting the order from the dashboard nothing fancy
    //and with that everything is set
    console.log("order success")
    res.status(200).json({data:"hello world"})
}