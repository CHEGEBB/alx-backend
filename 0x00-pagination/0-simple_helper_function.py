#!/usr/bin/env python3
''' 0-simple_helper_function.py file
'''

from typing import Tuple


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
