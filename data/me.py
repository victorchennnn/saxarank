#!/usr/bin/env python3

# Mean ELO

import csv

def main():
    avg = 0
    ct = 0
    with open('backup.csv', 'r') as newfile:
        newreader = csv.DictReader(newfile)
        for row in newreader:
            avg += float(row['elo'])
            ct += 1

    print(f'Average ELO: {avg / ct:.2f}')


if __name__ == '__main__':
    main()
