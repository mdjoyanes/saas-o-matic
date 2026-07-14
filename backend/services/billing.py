def calculate_base_price(active_users: int) -> float:
    """
    Calculates the monthly base price using tiered pricing.

    Tier 1: 0-10 users -> 10 €/user
    Tier 2: 11-50 users -> 8 €/user
    Tier 3: 51+ users -> 5 €/user
    """

    if active_users <= 0:
        return 0

    total = 0

    # First tier
    first_tier = min(active_users, 10)
    total += first_tier * 10

    # Second tier
    if active_users > 10:
        second_tier = min(active_users - 10, 40)
        total += second_tier * 8

    # Third tier
    if active_users > 50:
        third_tier = active_users - 50
        total += third_tier * 5

    return round(total, 2)