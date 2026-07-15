import re


def validate_cif(cif):

    cif = cif.upper().strip()


    # Formato CIF:
    # Letra inicial + 7 números + dígito/letra de control
    if not re.match(r"^[ABCDEFGHJNPQRSUVW]\d{7}[0-9A-J]$", cif):
        return False


    letter = cif[0]

    numbers = cif[1:8]

    control = cif[8]


    even_sum = 0
    odd_sum = 0


    for index, number in enumerate(numbers):

        value = int(number)


        if index % 2 == 0:
            multiplied = value * 2

            if multiplied >= 10:
                multiplied = (multiplied // 10) + (multiplied % 10)

            odd_sum += multiplied

        else:
            even_sum += value


    total = odd_sum + even_sum


    digit = (10 - (total % 10)) % 10


    control_letters = "JABCDEFGHI"


    if control.isdigit():

        return int(control) == digit


    else:

        return control == control_letters[digit]