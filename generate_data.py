import json
import random


def generate_user(user_id):
    return {
        "id": user_id,
        "username": f"user{user_id}",
        "email": f"user{user_id}@example.org"
    }


def generate_home(home_id):
    return {
        "id": home_id,
        "street_address": f"{random.randint(100, 9999)} {random.choice(['Main', 'Oak', 'Pine', 'Maple', 'Cedar'])} {random.choice(['St', 'Ave', 'Rd', 'Ln', 'Blvd'])}",
        "state": random.choice(["CA", "NY", "TX", "FL", "IL", "PA", "OH", "GA", "NC", "MI"]),
        "zip": f"{random.randint(10000, 99999)}",
        "sqft": round(random.uniform(500, 5000), 2),
        "beds": random.randint(1, 6),
        "baths": round(random.uniform(1, 5), 1),
        "list_price": round(random.uniform(100000, 2000000), 2)
    }


def generate_user_home(user_id, home_id):
    return {
        "userId": user_id,
        "homeId": home_id
    }


def generate_data(num_users, num_homes, min_relations, max_relations):
    users = [generate_user(i) for i in range(1, num_users + 1)]
    homes = [generate_home(i) for i in range(1, num_homes + 1)]

    user_homes = set()
    total_relations = random.randint(min_relations, max_relations)

    while len(user_homes) < total_relations:
        user_id = random.randint(1, num_users)
        home_id = random.randint(1, num_homes)
        user_homes.add((user_id, home_id))

    user_homes = [generate_user_home(user_id, home_id)
                  for user_id, home_id in user_homes]

    data = {
        "users": users,
        "homes": homes,
        "userHomes": user_homes
    }

    return data


# Generate data
num_users = 10
num_homes = 500
min_relations = 600  # Minimum number of user-home relationships
max_relations = 1000  # Maximum number of user-home relationships

generated_data = generate_data(
    num_users, num_homes, min_relations, max_relations)

# Save to JSON file
with open('user_home_data.json', 'w') as f:
    json.dump(generated_data, f, indent=2)

print("Data generated and saved to user_home_data.json")
print(
    f"Generated {len(generated_data['users'])} users, {len(generated_data['homes'])} homes, and {len(generated_data['userHomes'])} user-home relationships.")

# Print some statistics
user_counts = {}
home_counts = {}
for relation in generated_data['userHomes']:
    user_counts[relation['userId']] = user_counts.get(
        relation['userId'], 0) + 1
    home_counts[relation['homeId']] = home_counts.get(
        relation['homeId'], 0) + 1

print(
    f"Users with multiple homes: {sum(1 for count in user_counts.values() if count > 1)}")
print(
    f"Homes with multiple users: {sum(1 for count in home_counts.values() if count > 1)}")
print(f"Max homes per user: {max(user_counts.values())}")
print(f"Max users per home: {max(home_counts.values())}")
