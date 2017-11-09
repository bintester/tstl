/// <reference path="../API.ts" />

namespace std.experiments
{
	export class Semaphore implements ILockable
	{
		/**
		 * @hidden
		 */
		private acquired_count_: number;

		/**
		 * @hidden
		 */
		private size_: number;

		/**
		 * @hidden
		 */
		private listeners_: Queue<Pair<IListener, number>>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(size: number)
		{
			this.acquired_count_ = 0;
			this.size_ = size;

			this.listeners_ = new Queue<Pair<IListener, number>>();
		}

		public size(): number
		{
			return this.size_;
		}

		public expand(size: number): void
		{
			this.size_ = size;
		}

		/* ---------------------------------------------------------
			ACQURE & RELEASE
		--------------------------------------------------------- */
		public lock(): Promise<void>;
		public lock(count: number): Promise<void>;

		public lock(count: number = 1): Promise<void>
		{
			return new Promise<void>((resolve, reject) =>
			{
				let prev_acqured_count: number = this.acquired_count_;
				this.acquired_count_ += count;

				if (prev_acqured_count + count <= this.size_)
					resolve();
				else
					this.listeners_.push(make_pair(resolve, count));
			});
		}

		public try_lock(): boolean;
		public try_lock(count: number): boolean;

		public try_lock(count: number = 1): boolean
		{
			if (this.acquired_count_ + count > this.size_)
				return false;
			
			this.acquired_count_ += count;
			return true;
		}

		public unlock(): void;
		public unlock(count: number): void;

		public unlock(count: number = 1): void
		{
			this.acquired_count_ -= count;

			while (count != 0)
			{
				if (this.listeners_.front().second > count)
				{
					this.listeners_.front().second -= count;
					count = 0;
				}
				else
				{
					let fn: IListener = this.listeners_.front().first;

					// POP AND DECREAE COUNT FIRST
					count -= this.listeners_.front().second;
					this.listeners_.pop();

					fn(); // AND CALL LATER
				}
			}
		}
	}

	interface IListener
	{
		(): void;
	}
}