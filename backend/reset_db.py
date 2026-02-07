import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname='postgres',
    user='postgres',
    password='admin123',
    host='localhost',
    port='5432'
)
conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
cursor = conn.cursor()

# Drop and recreate database
try:
    cursor.execute("DROP DATABASE IF EXISTS online_polling_db;")
    print("Database dropped successfully")
    cursor.execute("CREATE DATABASE online_polling_db;")
    print("Database created successfully")
except Exception as e:
    print(f"Error: {e}")
finally:
    cursor.close()
    conn.close()
