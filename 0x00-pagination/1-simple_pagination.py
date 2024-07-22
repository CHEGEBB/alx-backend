#!/usr/bin/env python3
''' 1-simple_pagination.py file
'''

import csv
import math
from typing import List, Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    ''' Implementation of index_range functions
    Args:
        page (int): The current page number (1-indexed).
        page_size (int): The number of items per page.
    Return:
        Tuple of size two containing a start index and an end index
    '''
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return start_index, end_index


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        '''Implementation of get_page function
        Args:
            page (int): The current page number (1-indexed).
            page_size (int): The number of items per page.
        Returns:
            Appropriate page of the dataset
            If the input arguments are out of range for the dataset,
            an empty list should be returned
        '''
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        start_index, end_index = index_range(page, page_size)

        dataset = self.dataset()

        if start_index > len(dataset):
            return []

        return dataset[start_index:end_index]
