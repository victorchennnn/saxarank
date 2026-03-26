#!/usr/bin/env python3

# Battle count

from collections import defaultdict
import csv

def main():
    oldcount = defaultdict(int)
    with open('latest_rankings_data.csv', 'r') as oldfile:
        oldreader = csv.DictReader(oldfile)
        for row in oldreader:
            if row['category'] != 'tech': continue
            oldcount[row['name']] = int(row['headToHeads'])

    bc = 0
    with open('backup.csv', 'r') as newfile:
        newreader = csv.DictReader(newfile)
        for row in newreader:
            # print(f'{row["name"]}: old={oldcount[row["name"]]}, new={int(row["battles"])}, diff={int(row["battles"]) - oldcount[row["name"]]}')
            bc += int(row['battles']) - oldcount[row['name']]

    print(f'Total battles played: {bc}, roughly {bc / len(oldcount):.2f} per company')


if __name__ == '__main__':
    main()
