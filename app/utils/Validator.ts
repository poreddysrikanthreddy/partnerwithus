export default class Validators {
  static isEmailValid(email: string): boolean {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
  }

  static isFullName(fullname: string): any {
    if (fullname != "" && fullname.length >= 3 && fullname.length < 66) {
      // const reg = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
      const reg = /^(?!\d+$)(?:[a-zA-Z][a-zA-Z @/(),]*){3,}?$/;
      return {
        isFullname: reg.test(fullname),
        isErrorMsg: "Please enter valid special characters: - / @ ) ( ,",
      };
    } else if (fullname != "" && fullname.length < 3) {
      return {
        isFullname: false,
        isErrorMsg: "Name cannot be shorter than 3 characters.",
      };
    } else if (fullname != "" && fullname.length > 3 && fullname.length > 66) {
      return {
        isFullname: false,
        isErrorMsg: "Name cannot be longer than 66 characters.",
      };
    } else {
      return {
        isFullname: false,
        isErrorMsg: "Please enter a name.",
      };
    }
  }

  static isPhoneValid(inputtxt: string): boolean {
    const phoneno =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/im;
    return phoneno.test(inputtxt);
  }

  static isPasswordValid(pass: string): boolean {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return regex.test(pass);
  }

  static isPasswordValidMatch(pass: string): boolean {
    var pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return pattern.test(pass);
  }

  static isLengthRangeValid(
    text: string,
    minLength?: number,
    maxLength?: number
  ) {
    if (minLength && maxLength) {
      return text && text.length >= minLength && text.length <= maxLength;
    } else if (minLength) {
      return text && text.length >= minLength;
    } else if (maxLength) {
      return text && text.length <= maxLength;
    }
    return false;
  }

  static isEmpty(text: string): boolean {
    if (text == null || text == undefined) {
      return true;
    }

    text = `${text}`;
    if (text) {
      if (typeof text === "string") {
        return text.trim().length <= 0;
      }
      return true;
    }
    return `${text}`.length == 0;
  }

  static isNumberOnly(text: string): boolean {
    const regex = /\D/g;
    return !regex.test(text);
  }

  static isNumericValue(text: string): boolean {
    const regex = /^([0-9]*$)/;
    return regex.test(text);
  }
  static isValidInstaLink(link: string) {
    const expression =
      /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9-_]+)/im;
    return expression.test(link);
  }

  static isValidTwitterLink(link: string) {
    const expression =
      /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/;
    return expression.test(link);
  }

  static isValidFacebookLink(link: string) {
    const expression =
      /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/;
    return expression.test(link);
  }

  static isAlphaNumeric(number: string) {
    const expression = /^([0-9a-zA-Z]*$)/;

    return expression.test(number);
  }

  static countNumericDigitInString(text: string) {
    return text.replace(/[^0-9]/g, "").length;
  }

  static countAlphaDigitInString(text: string) {
    return text.replace(/[^a-zA-Z]/g, "").length;
  }

  static isFalse(text: boolean) {
    return text == false;
  }
}
