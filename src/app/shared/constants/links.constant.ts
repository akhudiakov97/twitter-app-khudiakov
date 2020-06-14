import { TwitterRoutingParam } from '@app/shared/constants/twitter-routing-param.constant';
import { FilterType } from '@app/shared/constants/filter-type.constant';

export const hashtagLink = `${TwitterRoutingParam.TWEETS}/${FilterType.HASHTAG}`;
export const userLink = `${TwitterRoutingParam.TWEETS}/${FilterType.USER}`;
