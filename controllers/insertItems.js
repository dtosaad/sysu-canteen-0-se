query = require('./query.js')
module.exports = async (ctx, next)=>{
	info = JSON.parse(ctx.request.body)
	queryObj = {}

	for(var i = 0; i < info.dishes.length; ++i){
		var dish = info.dishes[i]
		dish_id = dish.dish_id
		amount = dish.amount
		//update dishes
		sql1 = 'SELECT `ordered_count` FROM `dishes` WHERE `dish_id` ='+dish_id
		var results = await query.query(ctx, next,sql1, queryObj)
		original_count = results[0].ordered_count
		var new_count = amount+original_count
		sql2 = 'UPDATE `dishes` SET `ordered_count`= '+new_count+' WHERE `dish_id`='+dish_id
		await query.query(ctx, next,sql2, queryObj)
	}

	user_id = info.user_id
	dinning_choice = info.dinning_choice

	//update orders
	sql4 = 'INSERT INTO `orders` (`user_id1`, `dinning_choice`) VALUES ('+user_id+', '+dinning_choice+')'
	results = await query.query(ctx, next,sql4, queryObj)
	order_id = results.insertId
	
	// update order_record (order_id, dish_id,amount)
	sql5 = 'INSERT INTO `order_record` (`order_id`, `dish_id`, `amount`) VALUES ('+order_id+', '+dish_id+', '+amount+')'
	await query.query(ctx, next,sql5, queryObj)
}