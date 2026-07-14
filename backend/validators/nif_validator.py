DNI_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE"


def validate_dni(dni: str) -> bool:
    dni = dni.upper().strip()

    if len(dni) != 9:
        return False

    numbers = dni[:-1]
    letter = dni[-1]

    if not numbers.isdigit():
        return False

    expected = DNI_LETTERS[int(numbers) % 23]

    return letter == expected