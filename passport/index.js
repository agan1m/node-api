const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = (passport) => {
    let opts = {}

    // заголовок обязательно должен быть с маленькой буквы и в value просто передаем JSON_WEB_TOKEN_STRING
    // opts.jwtFromRequest = ExtractJwt.fromHeader('authorization');

    // по указанному ключу в теле post запроса просто передаем JSON_WEB_TOKEN_STRING
    // opts.jwtFromRequest = ExtractJwt.fromBodyField('token');

    // Заголовок: authorization, value: bearer JSON_WEB_TOKEN_STRING
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    opts.secretOrKey = 'dlkfbvhknfklvdfbjhnfksd';

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

        console.log("jwt_payload", jwt_payload);

        // User.getUserById(jwt_payload._id, function(err, user) {
        //     if (err) {
        //         return done(err, false);
        //     }
        //     if (user) {
        //         return done(null, user);
        //     } else {
        //         return done(null, false);
        //         // or you could create a new account
        //     }
        // });

        let user = {
            id: 123,
            name: "test"
        };
        return done(null, user);
    }));
}

