#!/usr/bin/env python3

import csv

need = ["name", "rating", "headToHeads", "website", "levelsWebsite"]
with open('latest_rankings_data.csv', 'r') as infile:
    reader = csv.DictReader(infile)
    f = reader.fieldnames
    keep = [col for col in f if col in need]

    with open('filtered_rankings_data.csv', 'w', newline='') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=keep)
        writer.writeheader()
        for row in reader:
            if row['category'] != 'tech': continue

            # Create a new row with only the columns we want to keep
            filtered_row = {col: row[col] for col in keep}
            writer.writerow(filtered_row)
