# employee_salary_sort.py

# Sample list of employee salaries
salaries = [45000.0, 38000.5, 52000.75, 61000.0, 47000.0, 70000.0, 56000.0, 49000.5]

# -------- a) Selection Sort --------
def selection_sort(salary_list):
    n = len(salary_list)
    for i in range(n):
        min_index = i
        for j in range(i + 1, n):
            if salary_list[j] < salary_list[min_index]:
                min_index = j
        salary_list[i], salary_list[min_index] = salary_list[min_index], salary_list[i]
    return salary_list

# -------- b) Bubble Sort --------
def bubble_sort(salary_list):
    n = len(salary_list)
    for i in range(n):
        for j in range(0, n - i - 1):
            if salary_list[j] > salary_list[j + 1]:
                salary_list[j], salary_list[j + 1] = salary_list[j + 1], salary_list[j]
    return salary_list

# -------- Run both sorts and display top 5 salaries --------

# Using Selection Sort
sorted_salaries_selection = selection_sort(salaries.copy())
print("Top 5 salaries (Selection Sort):", sorted_salaries_selection[-5:][::-1])

# Using Bubble Sort
sorted_salaries_bubble = bubble_sort(salaries.copy())
print("Top 5 salaries (Bubble Sort):", sorted_salaries_bubble[-5:][::-1])
