from enum import Enum
 
class job_status(Enum):
    APPLIED = 'APPLIED'
    INTERVIEW = 'INTERVIEW'
    OFFER = 'OFFER'
    NO_OFFER = 'NO_OFFER'