import re


def validate_dni(dni):

    dni = dni.upper().strip()

    if not re.match(r"^\d{8}[A-Z]$", dni):
        return False


    letters = "TRWAGMYFPDXBNJZSQVHLCKE"

    number = int(dni[:8])

    expected_letter = letters[number % 23]


    return dni[-1] == expected_letter