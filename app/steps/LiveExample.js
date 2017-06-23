import React, { Component } from "react";
import {
	ReactiveBase,
	CategorySearch,
	ResultCard,
	MultiDropdownList,
	RangeSlider
} from '@appbaseio/reactivesearch';
import moment from "moment";

import { dataOperation } from "../service/DataOperation";
import './Base.styl'

export class LiveExample extends Component {

	onData(res) {
		const result = {
			image: res.avatar,
			desc: (
				<div className="card-layout">
					<div className="card-title"><a href={res.url} target="_blank">{res.owner}/<br />{res.repo}</a></div>
					<a href={res.url} target="_blank">
						<div className="card-stars">
							<i className="fa fa-star" aria-hidden="true" />{res.stars}
						</div>
					</a>
					<div className="card-tags">
						{res.tags.map(tag => <span className="card-tag">#{tag}</span>)}
					</div>
				</div>
			)
		};
		return result;
	}

	render() {
		return (
			<ReactiveBase
				app="divgitxplore"
		    credentials="pRT1OUQPM:4c3263ae-e543-4b4b-867a-a30014fae8d5"
				theme="rbc-green"
			>
				<header>
					<div className="title">
						<h3>GitXplore</h3>
					</div>
					<div className="search-params">
						<CategorySearch
							title="Repos"
							componentId="SearchSensor"
							appbaseField="repo"
							categoryField="language"
							placeholder="Search Repos"
							autocomplete={false}
						/>
						<div className="search-filters">
							<MultiDropdownList
								componentId="TagSensor"
								appbaseField="tags"
								title="Repo Tags"
								searchPlaceholder="Search Tags"
								initialLoader="Loading Tags..."
								defaultSelected={[]}
							/>
							<RangeSlider
								title="Repo Stars"
								componentId="RangeSliderSensor"
								appbaseField="stars"
								initialLoader="Loading data..."
								showHistogram={false}
								range={{
									"start": 0,
									"end": 70000
								}}
								defaultSelected={{
									"start": 0,
									"end": 70000
								}}
								rangeLabels={{
									"start": "0 Stars",
									"end": "70K Stars"
								}}
								stepValue={50}
							/>
						</div>
					</div>
				</header>
				<div className="content">
					<ResultCard
						componentId="SearchResult"
						appbaseField="repo"
						initialLoader="Loading data..."
						noResults="Oops! Nothing found."
						pagination={true}
						size={12}
						paginationAt="top"
						onData={this.onData}
						react={{
							and: ["SearchSensor", "TagSensor", "RangeSliderSensor"]
						}}
						sortOptions={[
							{
								label: "Highest rated",
								appbaseField: "stars",
								sortBy: "desc"
							},
							{
								label: "Lowest rated",
								appbaseField: "stars",
								sortBy: "asc"
							},
							{
								label: "Alphabetic",
								appbaseField: "owner",
								sortBy: "asc"
							},
							{
								label: "Reverse alphabetic",
								appbaseField: "owner",
								sortBy: "desc"
							},
							{
								label: "Most recent",
								appbaseField: "created-on",
								sortBy: "desc"
							},
							{
								label: "Least recent",
								appbaseField: "created-on",
								sortBy: "asc"
							}
						]}
					/>
					<p className="footer">Made with <span className="go-green">❤</span> at <a href="https://appbase.io/" target="_blank">appbase.io</a></p>
				</div>
			</ReactiveBase>
		);
	}
}
