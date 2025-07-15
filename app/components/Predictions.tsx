import { Prediction } from "../types/globals";
import { bounceInOnEnter } from "../utils/animations";
import { motion } from "motion/react";
import Loader from "./Loader";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
	predictions: Prediction[] | null;
	loading: boolean;
}

const Predictions = ({ predictions, loading }: Props) => {
	return (
		<div>
			{loading ? (
				<motion.div
					{...bounceInOnEnter}
					className="flex items-center gap-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						fill="#000000"
						viewBox="0 0 256 256">
						<path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-52-56H92a28,28,0,0,0,0,56h72a28,28,0,0,0,0-56Zm-24,16v24H116V152ZM80,164a12,12,0,0,1,12-12h8v24H92A12,12,0,0,1,80,164Zm84,12h-8V152h8a12,12,0,0,1,0,24ZM72,108a12,12,0,1,1,12,12A12,12,0,0,1,72,108Zm88,0a12,12,0,1,1,12,12A12,12,0,0,1,160,108Z"></path>
					</svg>
					<p className="text-gray-600">Identifying breed...</p>
					<Loader />
				</motion.div>
			) : (
				predictions &&
				predictions.length > 0 && (
					<>
						<motion.div
							{...bounceInOnEnter}
							className="flex flex-col justify-center text-center gap-3">
							<p className="text-gray-600">The breed is</p>
							<p className="text-xl font-medium text-gray-700 capitalize">
								{predictions[0].breed}
							</p>
						</motion.div>

						<Accordion
							type="single"
							collapsible
							className="w-[85vw] min-w-[300px] md:w-[450px] my-12">
							<AccordionItem value="1">
								<AccordionTrigger className="text-gray-600">
									Not correct? See other predictions
								</AccordionTrigger>
								<AccordionContent className="inline-flex items-center flex-wrap justify-start w-full gap-2">
									{predictions
										.slice(1, 7)
										.map((prediction, i) => (
											<span
												className="bg-gray-200 px-2 py-1 rounded-md text-xs"
												key={i}>
												{prediction.breed}
											</span>
										))}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</>
				)
			)}
		</div>
	);
};

export default Predictions;
