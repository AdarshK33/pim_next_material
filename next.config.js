
const {
    ONBOARD_SERVICE_URL,
	AUTH_SERVICE_URL,
	ONBOARD_QUERY_SERVICE_URL
} = process.env;

module.exports = {
	reactStrictMode: true,
	env: {
		ONBOARD_SERVICE_URL,
		AUTH_SERVICE_URL,
		ONBOARD_QUERY_SERVICE_URL
	},
	// images: {
	// 	domains: [
	// 		"",
	// 	],
	// 	disableStaticImages: false,
	// },
};
