/// <reference path="../API.ts" />

namespace std
{
	/**
	 * Pair of values.
	 *
	 * This class couples together a pair of values, which may be of different types (<i>T1</i> and 
	 * <i>T2</i>). The individual values can be accessed through its public members {@link first} and 
	 * {@link second}.
	 *
	 * @param <T1> Type of member {@link first}.
	 * @param <T2> Type of member {@link second}.
	 *
	 * @reference http://www.cplusplus.com/reference/utility/pair
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class Pair<T1, T2> implements IComparable<Pair<T1, T2>>
	{
		/**
		 * A first value in the Pair.
		 */
		public first: T1;

		/**
		 * A second value in the Pair.
		 */
		public second: T2;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from pair values.
		 *
		 * @param first The first value of the Pair
		 * @param second The second value of the Pair
		 */
		public constructor(first: T1, second: T2)
		{
			this.first = first;
			this.second = second;
		}

		/* ---------------------------------------------------------
			COMPARISON
		--------------------------------------------------------- */
		/**
		 * Whether a Pair is equal with the Pair.
		 * 
		 * Compare each first and second value of two Pair(s) and returns whether they are equal or not.
		 * 
		 * If stored key and value in a Pair are not number or string but an object like a class or struct, 
		 * the comparison will be executed by a member method (SomeObject)::equals(). If the object does not have 
		 * the member method equal_to(), only address of pointer will be compared.
		 *
		 * @param obj A Map to compare
		 * @return Indicates whether equal or not.
		 */
		public equals<U1 extends T1, U2 extends T2>(pair: Pair<U1, U2>): boolean
		{
			return equal_to(this.first, pair.first) && equal_to(this.second, pair.second);
		}

		/**
		 * @inheritdoc
		 */
		public less<U1 extends T1, U2 extends T2>(pair: Pair<U1, U2>): boolean
		{
			if (equal_to(this.first, pair.first) == false)
				return less(this.first, pair.first);
			else
				return less(this.second, pair.second);
		}
	}
}
