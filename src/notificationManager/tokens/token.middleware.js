exports.validateInputForAddToken = (token, user_id) => {
  try {
    const errorMessages = [];

    if (!user_id || user_id === ":user_id") {
      errorMessages.push("UserId is mandatory");
    }

    if (!token) {
      errorMessages.push("Token is mandatory");
    }

    if (errorMessages.length) {
      throw errorMessages.join(" ,");
    }

    return {
      error: false,
      code: 200,
      message: "Success",
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      code: 400,
      message: err,
    };
  }
};
