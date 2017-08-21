findOne(arg1, callback(err, user)).async();

promise = asyncFind => findOne(arg1, callback(err, user));

//promise = User.findOne(arg1, callback(err, user));
