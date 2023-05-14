const usePatterns = () => {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const usernamePattern = /^[0-9a-z]{3,20}$/
    const passwordLengthPattern = /^.{6,30}$/
    const passwordPattern =
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    const lettersPattern = /^[A-zÀ-ú\s]+$/
    const numbersPattern = /^[0-9]+\s*$/gm
    const amountPattern = /^[\d,.-]+$/
    const alphanumericPattern = /^([A-zÀ-ú0-9]+\s?)*([A-zÀ-ú0-9]+)\s*$/gm

    return {
        emailPattern,
        usernamePattern,
        passwordLengthPattern,
        passwordPattern,
        lettersPattern,
        numbersPattern,
        alphanumericPattern,
        amountPattern,
    }
}

export default usePatterns